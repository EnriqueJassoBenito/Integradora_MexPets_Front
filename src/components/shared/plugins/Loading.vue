<template>
    <div class="custom-loader"></div>
</template>

<script>
export default {
    name: 'Loading',
};
</script>

<style>
.custom-loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background:
        radial-gradient(farthest-side, #81B622 94%, #0000) top/8px 8px no-repeat,
        conic-gradient(#0000 30%, #81B622);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    animation: spin 1s infinite linear;
}

@keyframes spin {
    100% {
        transform: rotate(1turn)
    }
}
</style>