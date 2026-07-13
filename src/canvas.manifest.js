export const manifest = {
  screens: {
    scr_hkrol2: { name: "Login", route: "/login", position: { "x": 160, "y": 220 } },
    scr_59tlcz: { name: "Register", route: "/register", position: { "x": 1560, "y": 220 } },
    scr_rv11nt: { name: "Admin Dashboard", route: "/dashboard", state: { "role": "Administrator" }, position: { "x": 160, "y": 2200 } },
    scr_i5wv84: { name: "Manager Dashboard", route: "/dashboard", state: { "role": "Project Manager" }, position: { "x": 1560, "y": 2200 } },
    scr_syhsup: { name: "Member Dashboard", route: "/dashboard", state: { "role": "Team Member" }, position: { "x": 2960, "y": 2200 } },
    scr_x4qwub: { name: "User Management", route: "/users", state: { "role": "Administrator" }, position: { "x": 160, "y": 4180 } },
    scr_6frinw: { name: "Role Management", route: "/roles", state: { "role": "Administrator" }, position: { "x": 1560, "y": 4180 } },
    scr_qbr8uw: { name: "Projects", route: "/projects", state: { "role": "Project Manager" }, position: { "x": 160, "y": 6160 } },
    scr_zpm83b: { name: "Create Project", route: "/projects/new", state: { "role": "Project Manager" }, position: { "x": 1560, "y": 6160 } },
    scr_1vufjo: { name: "Project Details", route: "/projects/p1", state: { "role": "Project Manager" }, position: { "x": 2960, "y": 6160 } },
    scr_u6kxr7: { name: "Task Management", route: "/tasks", state: { "role": "Project Manager" }, position: { "x": 160, "y": 8140 } },
    scr_q0ybyu: { name: "My Tasks", route: "/tasks", state: { "role": "Team Member" }, position: { "x": 1560, "y": 8140 } },
    scr_td5wez: { name: "Task Details", route: "/tasks/t1", state: { "role": "Team Member" }, position: { "x": 2960, "y": 8140 } },
    scr_n5e6hz: { name: "Kanban Board", route: "/board", state: { "role": "Project Manager" }, position: { "x": 4360, "y": 8140 } },
    scr_1zqdt8: { name: "Calendar", route: "/calendar", state: { "role": "Project Manager" }, position: { "x": 5760, "y": 8140 } },
    scr_d6szin: { name: "Audit Logs", route: "/audit", state: { "role": "Administrator" }, position: { "x": 2960, "y": 4180 } },
    scr_fbwuxh: { name: "Team", route: "/team", state: { "role": "Project Manager" }, position: { "x": 2960, "y": 10120 } },
    scr_el95q9: { name: "AI Assistant", route: "/assistant", state: { "role": "Team Member" }, position: { "x": 4360, "y": 10120 } },
    scr_bmry2s: { name: "Profile", route: "/profile", state: { "role": "Administrator" }, position: { "x": 160, "y": 10120 } },
    scr_iic7ic: { name: "Settings", route: "/settings", state: { "role": "Administrator" }, position: { "x": 1560, "y": 10120 } }
  },
  sections: {
    sec_5uhjel: { name: "Authentication", x: 0, y: 0, width: 2920, height: 1180 },
    sec_6xd0jx: { name: "Dashboards", x: 0, y: 1980, width: 4320, height: 1180 },
    sec_teyqgq: { name: "Admin Management", x: 0, y: 3960, width: 4320, height: 1180 },
    sec_fdn144: { name: "Projects", x: 0, y: 5940, width: 4320, height: 1180 },
    sec_8rn4mx: { name: "Tasks", x: 0, y: 7920, width: 7120, height: 1180 },
    sec_874c08: { name: "User Settings & Profile", x: 0, y: 9900, width: 5720, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_5uhjel", children: [
    { kind: "screen", id: "scr_hkrol2" },
    { kind: "screen", id: "scr_59tlcz" }]
  },
  { kind: "section", id: "sec_6xd0jx", children: [
    { kind: "screen", id: "scr_rv11nt" },
    { kind: "screen", id: "scr_i5wv84" },
    { kind: "screen", id: "scr_syhsup" }]
  },
  { kind: "section", id: "sec_teyqgq", children: [
    { kind: "screen", id: "scr_x4qwub" },
    { kind: "screen", id: "scr_6frinw" },
    { kind: "screen", id: "scr_d6szin" }]
  },
  { kind: "section", id: "sec_fdn144", children: [
    { kind: "screen", id: "scr_qbr8uw" },
    { kind: "screen", id: "scr_zpm83b" },
    { kind: "screen", id: "scr_1vufjo" }]
  },
  { kind: "section", id: "sec_8rn4mx", children: [
    { kind: "screen", id: "scr_u6kxr7" },
    { kind: "screen", id: "scr_q0ybyu" },
    { kind: "screen", id: "scr_td5wez" },
    { kind: "screen", id: "scr_n5e6hz" },
    { kind: "screen", id: "scr_1zqdt8" }]
  },
  { kind: "section", id: "sec_874c08", children: [
    { kind: "screen", id: "scr_bmry2s" },
    { kind: "screen", id: "scr_iic7ic" },
    { kind: "screen", id: "scr_fbwuxh" },
    { kind: "screen", id: "scr_el95q9" }]
  }]

};