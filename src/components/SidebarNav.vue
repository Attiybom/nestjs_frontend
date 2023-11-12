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
	sidebarWidth: {
		type: String,
		default: '200px',
	},
	menus: {
		type: Array as PropType<Array<MenusItem>>,
		default: () => [] as MenusItem[],
	},
	tagsList: {
		type: Array,
		default: () => [],
	},
});

// 页签
const emit = defineEmits(['menu-selected']);

const onMenuSelect = (name: any) => {
	const menu = menus.find((m) => m.path === name);
	emit('menu-selected', menu);
	// console.log('menu', menu)
};

const handleNavClick = (routeName: string = 'dashboard') => {
	router.push(routeName);
	console.log('handleNavClick', routeName);
	onMenuSelect(routeName);
};
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
			<el-menu-item :index="'home'" @click="handleNavClick()">
				<!-- <el-icon><PictureRounded /></el-icon> -->
				<div class="logo-container">
					<img src="../assets/vue.svg" alt="attiy-vue-template" />
				</div>
				<template #title>attiy-vue-template</template>
			</el-menu-item>
			<el-menu-item
				v-for="item in menus"
				:index="item.path"
				@click="handleNavClick(item.routeName)"
				:key="item.id"
			>
				<el-icon>
					<component :is="item.icon" />
				</el-icon>
				<template #title>{{ item.name }}</template>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<style lang="scss" scoped>
.logo-container {
	display: flex; /* 使用flex布局 */
	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
	img {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 100%;
	min-height: 100%;
}
/* 针对菜单项的样式 */
.el-menu-item {
	display: flex; /* 使用flex布局 */
	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
}

/* 针对子菜单标题的样式 */
.el-submenu__title {
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 当菜单收缩时，隐藏文本标题 */
.el-menu--collapse .el-menu-item__title,
.el-menu--collapse .el-submenu__title-text {
	display: none;
}

/* 可能需要调整内边距确保图标居中 */
.el-menu--collapse .el-menu-item,
.el-menu--collapse .el-submenu__title {
	padding-left: 0;
	padding-right: 0;
}

/* 去除菜单边框 */
.el-menu {
	border: none;
}
</style>
