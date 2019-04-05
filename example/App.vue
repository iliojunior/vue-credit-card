<template>
  <v-app>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <div class="title">
          Vuetify Credit Card
        </div>
      </v-layout>
      <v-layout row wrap>
        <a class="caption" href="https://github.com/iliojunior" target="_blank">
          Ilio Adriano de Oliveira Junior (ilioadriano@live.com)
        </a>
      </v-layout>
      <v-layout row wrap>
        <a class="caption" href="https://github.com/iliojunior/vuetify-credit-card" target="_blank">
          Fork on Github
        </a>
      </v-layout>
      <v-layout row wrap>
        <a class="caption" href="https://www.npmjs.com/package/vuetify-credit-card" target="_blank">
          NPM.
        </a>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-layout row wrap>
            <v-text-field name="number" label="Card number" v-model="cardDetail.number" />
          </v-layout>
        </v-flex>
        <v-flex xs12 md6>
          <v-layout row wrap>
            <v-text-field name="name" label="Full Name" v-model="cardDetail.name" />
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-layout row wrap>
            <v-text-field name="expiry" label="MM/YY" v-model="cardDetail.expiry" />
          </v-layout>
        </v-flex>
        <v-flex xs12 md6>
          <v-layout row wrap>
            <v-text-field
              name="cvv"
              label="CVV"
              v-model="cardDetail.cvv"
              @focus="invertedCard = true"
              @blur="invertedCard = false"
            />
          </v-layout>
        </v-flex>
      </v-layout>

      <v-spacer />

      <v-flex xs12 md3>
        <Card v-model="cardDetail" :invert-card.sync="invertedCard" format-data />
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import { VApp, VContainer, VLayout, VTextField, VFlex, VSpacer } from 'vuetify/lib'
import Card from '@/components/Card'

export default {
  name: 'card-example',
  components: {
    VApp,
    VContainer,
    VLayout,
    VTextField,
    VFlex,
    VSpacer,
    Card
  },
  data: () => ({
    invertedCard: false,
    cardDetail: {
      number: '5145607790954405',
      name: 'Name of Mastercard',
      expiry: '122018',
      cvv: '123'
    }
  })
}
</script>
