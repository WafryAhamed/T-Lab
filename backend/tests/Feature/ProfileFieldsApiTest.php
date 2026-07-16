<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileFieldsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_me_endpoint_returns_phone_and_department_for_authenticated_user(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin.profile@example.com',
            'password' => Hash::make('password'),
            'role' => 'Administrator',
            'status' => 'Active',
            'phone' => '+94770000000',
            'department' => 'Engineering',
            'email_verified_at' => now(),
        ]);

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/me');

        $response->assertOk()
            ->assertJsonPath('user.phone', '+94770000000')
            ->assertJsonPath('user.department', 'Engineering');
    }

    public function test_admin_can_update_phone_and_department(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin Update',
            'email' => 'admin.update@example.com',
            'password' => Hash::make('password'),
            'role' => 'Administrator',
            'status' => 'Active',
            'email_verified_at' => now(),
        ]);

        $token = JWTAuth::fromUser($admin);

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson('/api/users/' . $admin->id, [
                'phone' => '+94770000001',
                'department' => 'Product',
            ]);

        $response->assertOk()
            ->assertJsonPath('phone', '+94770000001')
            ->assertJsonPath('department', 'Product');

        $this->assertDatabaseHas('users', [
            'id' => $admin->id,
            'phone' => '+94770000001',
            'department' => 'Product',
        ]);
    }

    public function test_non_admin_cannot_access_user_management_routes(): void
    {
        $member = User::factory()->create([
            'name' => 'Member User',
            'email' => 'member.access@example.com',
            'password' => Hash::make('password'),
            'role' => 'Team Member',
            'status' => 'Active',
            'email_verified_at' => now(),
        ]);

        $token = JWTAuth::fromUser($member);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/users')
            ->assertStatus(403);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/users', [
                'name' => 'New User',
                'email' => 'new.user@example.com',
                'password' => 'password123',
            ])
            ->assertStatus(403);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson('/api/users/' . $member->id, [
                'name' => 'Updated Name',
            ])
            ->assertStatus(403);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->deleteJson('/api/users/' . $member->id)
            ->assertStatus(403);
    }

    public function test_admin_can_create_and_update_user_role_and_status(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin.create@example.com',
            'password' => Hash::make('password'),
            'role' => 'Administrator',
            'status' => 'Active',
            'email_verified_at' => now(),
        ]);

        $token = JWTAuth::fromUser($admin);

        $createResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/users', [
                'name' => 'New Manager',
                'email' => 'manager.create@example.com',
                'password' => 'password123',
                'role' => 'Project Manager',
                'status' => 'Active',
                'phone' => '+94770000002',
                'department' => 'Operations',
            ]);

        $createResponse->assertStatus(201)
            ->assertJsonPath('role', 'Project Manager')
            ->assertJsonPath('status', 'Active');

        $createdUser = User::where('email', 'manager.create@example.com')->firstOrFail();
        $this->assertSame('Project Manager', $createdUser->role);
        $this->assertSame('Operations', $createdUser->department);

        $updateResponse = $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson('/api/users/' . $createdUser->id, [
                'role' => 'Team Member',
                'status' => 'Inactive',
            ]);

        $updateResponse->assertOk()
            ->assertJsonPath('role', 'Team Member')
            ->assertJsonPath('status', 'Inactive');

        $this->assertDatabaseHas('users', [
            'id' => $createdUser->id,
            'role' => 'Team Member',
            'status' => 'Inactive',
        ]);
    }
}
