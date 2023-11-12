<script setup lang="ts">
import { PropType, ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// types
import { MenusItem } from './types/SidebarNav';

// 路由
const router = useRouter();
const route = useRoute();

const activeMenu = ref('dashboard');
// 设置当前激活的菜单项
const updateActiveMenu = () => {
	// 逻辑：根据路由状态设置激活项，这里的route.path是当前路由的完整路径
	console.log('route', route);
	const routeInfo = route.name || route.path;
	activeMenu.value = routeInfo as string;
};

// 组件挂载时更新激活状态
onMounted(updateActiveMenu);

// 监听路由变化并更新激活状态
watch(() => route.path, updateActiveMenu);

// 父传子
const { isCollapse, menus } = defineProps({
	isCollapse: {
		type: Boolean,
		default: false,
	},
	// sidebarWidth: {
	// 	type: String,
	// 	default: '200px'
	// },
	menus: {
		type: Array as PropType<Array<MenusItem>>,
		default: () => [] as MenusItem[],
	},
});


const handleNavClick = (routeName: string = 'home') => {
	router.push(routeName);
};


// 宽度

</script>

<template>
	<div class="sidebar-nav">
		<el-menu
			:collapse-transition="true"
			unique-opened
			:default-active="activeMenu"
			class="el-menu-vertical-demo"
			:collapse="isCollapse"
			background-color="#374152"
			active-text-color="#ffcc40"
			text-color="#fff"
		>
			<el-menu-item
				:index="item.path"
				@click="handleNavClick(item.routeName)"
				v-for="item in menus"
				:key="item.id"
			>
				<el-icon><HomeFilled /></el-icon>
				<template #title>{{ item.name }} - {{ item.path }}</template>
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 100%;
	min-height: 100%;
	min-width: 65px;
}
</style>
