<template>
<div>
    <google-map />
</div>
</template>

<script>
  
import GoogleMap from "../components/GoogleMap";

  export default {
    name:"home",
    
    components: {
      GoogleMap
    },
    props:{

    }
  }
</script>