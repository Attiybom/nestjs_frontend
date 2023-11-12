<script setup lang="ts">
import { PropType } from 'vue';
import { useRouter } from 'vue-router';

// types
import { MenusItem } from './types/SidebarNav';


const { isCollapse, menus } = defineProps({
	isCollapse: {
		type: Boolean,
		default: false,
	},
	menus: {
		type: Array as PropType<Array<MenusItem>>,
		default: () => [] as MenusItem[],
	},
});

// const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};

const router = useRouter();
const handleNavClick = (routeName: string = 'home') => {
	router.push(routeName);
};



</script>

<template>
	<div class="sidebar-nav">
		<el-menu
			collapse-transition
			unique-opened
			default-active="1"
			class="el-menu-vertical-demo"
			:collapse="isCollapse"
			@open="handleOpen"
			@close="handleClose"
		>
			<el-menu-item
				:index="item.id + ''"
				@click="handleNavClick(item.routeName)"
				v-for="(item) in menus"
				:key="item.id"
			>
				<el-icon><HomeFilled /></el-icon>
				<template #title>{{ item.name }}</template>
			</el-menu-item>
			<!-- <el-sub-menu index="1" @click="handleNavClick()">
				<template #title>
					<el-icon><User /></el-icon>
					<span>用户管理</span>
				</template>
				<el-menu-item-group>
					<template #title><span>Group One</span></template>
					<el-menu-item index="1-1">item one</el-menu-item>
					<el-menu-item index="1-2">item two</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group Two">
					<el-menu-item index="1-3">item three</el-menu-item>
				</el-menu-item-group>
				<el-sub-menu index="1-4">
					<template #title><span>item four</span></template>
					<el-menu-item index="1-4-1">item one</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
			<el-menu-item index="2" @click="handleNavClick('roles')">
				<el-icon>
					<setting />
				</el-icon>
				<template #title>权限管理</template>
			</el-menu-item>
			<el-menu-item index="3" @click="handleNavClick('menus')">
				<el-icon>
					<Menu />
				</el-icon>
				<template #title>菜单管理</template>
			</el-menu-item> -->
		</el-menu>
	</div>
</template>

<style lang="scss" scoped>
.sidebar-nav {
	// background-color: #6a79f3;

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: inherit;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 100%;
	min-height: 400px;
}
// .el-menu--collapse {
// 	width: 100%;
// }
</style>
