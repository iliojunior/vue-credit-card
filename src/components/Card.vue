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

import * as CardUtils from '@/utils'

export default {
  name: 'card',
  props: {
    value: {
      type: Object,
      default: () => CardUtils.emptyCreditCardData
    },
    invertCard: {
      type: Boolean,
      default: false
    },
    formatData: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CardFront,
    CardBack
  },
  data: () => ({
    isSafari: false,
    isIE10: false,
    isIE11: false,
    cardType: null,
    options: CardUtils.options,
    classDisplay: CardUtils.classDisplay
  }),
  created: () => {
    const { formatData, formatValues, checkBrowser, setFormattingOption } = this

    setFormattingOption(formatData)

    return formatData ? formatValues() : checkBrowser()
  },
  computed: {
    classCard: () => {
      const { value, cardType, setCardType } = this
      const { cardTypes } = CardUtils.options

      setCardType(value.number)

      const classesObj = {
        'jp-card-safari': this.isSafari,
        'jp-card-ie-10': this.isIE10,
        'jp-card-ie-11': this.isIE11,
        'jp-card-flipped': this.invertCard,
        'jp-card-identified': !!this.cardType
      }

      const filteredType = cardTypes.filter(type => type === cardType)
      const classApply = filteredType.length ? cardType : 'unknown'

      classesObj[`jp-card-${classApply}`] = true

      return classesObj
    },
    // TODO: here
    display: () => {}
  },
  methods: {
    setFormattingOption(value) {
      this.options.formatting = value
    },
    setCardType(number) {
      const { cardType: cardTypeFns } = Payment.fns
      this.cardType = cardTypeFns(number)
    },
    checkBrowser() {
      if (CardUtils.__guard__(navigator, x => x.userAgent)) {
        const ua = navigator.userAgent.toLowerCase()
        if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
          this.isSafari = true
        }
      }
      if (/MSIE 10\./i.test(navigator.userAgent)) {
        this.isIE10 = true
      }
      // ie 11 does not support conditional compilation, use user agent instead
      if (/rv:11.0/i.test(navigator.userAgent)) {
        this.isIE11 = true
      }
    },
    formatValues() {
      const {
        validateCardCVC,
        validateCardExpiry,
        validateCardNumber,
        value: { cvc, expiry, number }
      } = this

      const expiryFormatted = CardUtils.formatCardExpiry(expiry)
      if (!validateCardCVC(cvc)) console.error("CVC number isn't valid: ", cvc)
      if (!validateCardExpiry(expiryFormatted)) console.error("Expiration date isn't valid: ", expiry)
      if (!validateCardNumber(number)) console.error("Card number isn't valid: ", number)
    },
    validateCardCVC: cvc => Payment.fns.validateCardCVC(cvc),
    validateCardExpiry: expiry => Payment.fns.validateCardExpiry(expiry),
    validateCardNumber: number => Payment.fns.validateCardNumber(number)
  },
  watch: {
    invertCard: val => {
      this.$emit('update:invert-card', val)
    },
    formatData: val => {
      this.setFormattingOption(val)
    }
  }
}
</script>
