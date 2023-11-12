<script setup lang="ts">
import { PropType } from 'vue';
import { TagItem } from './types/TagsList';
import { useRouter } from 'vue-router';

const { tagsList } = defineProps({
	tagsList: {
		type: Array as PropType<Array<TagItem>>,
		default: () => [] as TagItem[],
	},
	activeTag: {
		type: String,
		default: 'dashboard'
	}
});

const router = useRouter()

const handleTagClick = (tag: TagItem) => {
	router.push(tag.routeName)
};

const emit = defineEmits(['close-Tag'])

const handleCloseTag = (tag: TagItem) => {
	// tags.value = tags.value.filter((tag) => tag.name !== name);
	if (tag.routeName === 'dashboard') return
	emit('close-Tag', tag)
};
</script>

<template>
	<div class="tags-container">
		<el-tag
			v-for="tag in tagsList"
			:key="tag.name"
			class="tag-item"
			:closable="tag.routeName !== 'dashboard'"
			:type="activeTag === tag.routeName ? 'success' : ''"
			@click="handleTagClick(tag)"
			@close="handleCloseTag(tag)"
		>
			{{ tag.name }}
		</el-tag>
	</div>
</template>

<style lang="scss" scoped>
.tags-container {
	background-color: #ecebec;
}
.tag-item {
	cursor: pointer;
}
</style>
