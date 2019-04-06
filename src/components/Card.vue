<template>
  <div id="card">
    <div class="jp-card-container">
      <div :class="classCard">
        <CardFront />
        <CardBack :class="classDisplay" />
      </div>
    </div>
  </div>
</template>

<script>
import Payment from 'payment/lib'

import CardFront from '@/components/CardFront'
import CardBack from '@/components/CardBack'

import CardUtils from '@/utils'

export default {
  name: 'card',
  props: {
    value: {
      type: Object,
      default: () => CardService.emptyCreditCardData
    }
  },
  components: {
    CardFront,
    CardBack
  }
}
</script>
