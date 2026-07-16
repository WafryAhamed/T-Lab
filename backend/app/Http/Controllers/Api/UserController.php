<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\AuditLog;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()?->role !== 'Administrator') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $query = User::query();
        if ($request->has('search')) {
            $s = $request->get('search');
            $query->where('name', 'ilike', "%{$s}%")->orWhere('email', 'ilike', "%{$s}%");
        }
        $perPage = intval($request->get('perPage', 50));
        $users = $query->orderBy('name')->paginate($perPage);
        return response()->json($users);
    }

    public function show(Request $request, $id)
    {
        if ($request->user()?->role !== 'Administrator') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        if ($request->user()?->role !== 'Administrator') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'sometimes|required|string|in:Administrator,Project Manager,Team Member',
            'status' => 'sometimes|required|string|in:Active,Inactive',
            'phone' => 'nullable|string|max:20',
            'department' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
        ]);

        $data['email'] = mb_strtolower(trim($data['email']));

        return DB::transaction(function () use ($data, $request) {
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
            AuditLog::create([
                'user_id' => $request->user()?->id,
                'event' => 'user.created',
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'new_values' => $user->toArray(),
            ]);
            return response()->json($user, 201);
        });
    }

    public function update(Request $request, $id)
    {
        if ($request->user()?->role !== 'Administrator') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $user = User::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,'.$id,
            'password' => 'nullable|string|min:6',
            'role' => 'sometimes|required|string|in:Administrator,Project Manager,Team Member',
            'status' => 'sometimes|required|string|in:Active,Inactive',
            'phone' => 'nullable|string|max:20',
            'department' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
        ]);

        if (isset($data['email'])) {
            $data['email'] = mb_strtolower(trim($data['email']));
        }

        return DB::transaction(function () use ($user, $data, $request) {
            $old = $user->getOriginal();
            if (!empty($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            } else {
                unset($data['password']);
            }
            $user->update($data);
            AuditLog::create([
                'user_id' => $request->user()?->id,
                'event' => 'user.updated',
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'old_values' => $old,
                'new_values' => $user->toArray(),
            ]);
            return response()->json($user);
        });
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()?->role !== 'Administrator') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $user = User::findOrFail($id);
        return DB::transaction(function () use ($user, $request) {
            $user->delete();
            AuditLog::create([
                'user_id' => $request->user()?->id,
                'event' => 'user.deleted',
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'old_values' => $user->toArray(),
            ]);
            return response()->json(['message' => 'deleted']);
        });
    }
}
