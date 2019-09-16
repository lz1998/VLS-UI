<template>
    <div>
        <img width="100%" height="100%" :src="img">
    </div>
</template>

<script type="text/ecmascript-6">
    import img from '../image/logo.png'
    export default {
        name: "logo",
        props:{
            img: {
                type: String,
                default: img
            }
        }
    }
</script>

<style lang="scss">

</style>
