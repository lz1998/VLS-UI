<template>
    <div class="logo" >
            <el-button v-if="!imgUrl" @click="handleLogoFile" type="success">点击上传logo</el-button>
            <img :src="imgUrl" class="logoImg preview" v-if="imgUrl" @click="handleLogoFile">
            <input @change="getImageFile" ref="logo"  type="file" style="display: none"
               accept="image/jpg, image/jpeg, image/gif, image/png">
    </div>

</template>

<script type="text/ecmascript-6">
    import {setScreen} from "@/api/screen.js"
    import {getScreen} from "@/api/screen.js"
    export default {
        name: "uploadLogo",
        data(){
            return{
                imgUrl:null,
                notice:null,

                logoShow:false
            }
        },
        methods:{
            handleLogoFile(){
                this.$refs.logo.click();
            },
            getImageFile(e){
                let file = e.target.files[0];
                console.log(file)
                let reader = new FileReader()
                reader.onload = () => {
                    this.imgUrl = reader.result
                    getScreen.then(res=>{
                        if (!res.status) {
                            this.$message("失败")
                            return
                        }else if(res.screen!=undefined&&res.screen!=null){
                            let screen = res.screen;
                            let data = new URLSearchParams()
                            data.append("backgroundColor", "red")
                            data.append("id", 1)
                            data.append("imgUrl", this.imgUrl)
                            data.append("notice",screen.notice )

                            for (let i = 0; i < 9; i++) {
                                data.append("chart"+i.toString()+"Id", screen["chart" + i.toString() + "Id"])
                            }
                            setScreen(data).then(res => {
                                if (res.status) {
                                    // success
                                    this.$message({
                                        message: "保存成功",
                                        type: 'success',
                                        duration: 3000
                                    })
                                } else {
                                    this.$message({
                                        message: "保存失败",
                                        type: 'error',
                                        duration: 3000
                                    })
                                }
                            })
                        }else{
                            return;
                        }
                    })
                }
                reader.readAsDataURL(file);
            }

        }
    }
</script>

<style lang="scss">


</style>
