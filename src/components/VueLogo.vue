<template>
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style="enable-background:new 0 0 512 512;"
    xml:space="preserve"
  >
    <g>
      <path
        :style="`fill:${color};`"
        d="M286.8,45.2l-29.4,57.9L228,45.2H0l229.4,421.6h56.1L512,45.2H286.8z M257.4,176.4l49.8-98h58.1L257.3,275L147.3,78.4h60.4
		L257.4,176.4z M265.7,433.6h-16.6L55.8,78.4h53.4l148.4,265l145.6-265h53.4L265.7,433.6z"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: "VueLogo",
  props: {
    color: {
      type: String,
      default: "#3eaf7c"
    }
  }
};
</script>
