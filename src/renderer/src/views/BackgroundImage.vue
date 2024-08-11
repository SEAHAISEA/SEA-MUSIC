<template>
    <el-row justify="center">
        <el-col :span="10" :lg="8">
            <div class="myFlex">
                <img :src="backgroundImageStore.imageUrl" class="bgImg" alt="">
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted ,watch} from 'vue';
import { useBackgroundImageStore } from '@renderer/stores/backgroundImage';
const backgroundImageStore = useBackgroundImageStore();


onMounted(() => {
    backgroundImageStore.initBackgroundImage();

    watch(() => backgroundImageStore.imageUrl,
        (imageUrl) => {
            backgroundImageStore.setStorageBgImgData(imageUrl);
        }
    )

})

</script>

<style scoped>
.bgImg {
    width: 300px;
    height: 300px;
    margin-top: 110px;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    cursor: default;
    filter: saturate(150%);
}


@media (min-width:1200px) {
    .bgImg {
        width: 560px;
        height: 560px;
        margin-top: 110px;
    }

}
</style>