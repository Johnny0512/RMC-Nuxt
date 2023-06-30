<template>
    <div class="navbar bg-base-100"> <!-- rounded-2xl shadow-2xl-->
        <div class="navbar-start">
            <NuxtLink class="btn btn-ghost normal-case text-xl" to="/">Rate My Classmates</NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><NuxtLink to="/guide">Guide</NuxtLink></li>
                <li tabindex="0">
                    <details>
                        <summary>Parent</summary>
                        <ul class="p-2">
                            <li><NuxtLink to="/list">list</NuxtLink></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
                <li><NuxtLink to="/">index</NuxtLink></li>
            </ul>
        </div>
        <div class="navbar-end gap-2">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="/assets/images/koala.jpg" />
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
