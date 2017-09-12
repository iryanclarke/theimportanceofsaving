<template lang="jade">
  .column.is-half
  h3 Scenario #1
  .columns
    .column.is-half
      .field
        label.label Starting Amount
        .control
          input.input(type='text', value='$10,000', placeholder='Text input')
      .field
        label.label Regular Saving Addition
        .control
          input.input(v-model='apm', type='text', value='$400', placeholder='Text input')
      .field
        label.label Saving Addition Frequency
        .control
          .select
            select
              option Weekly
              option Bi-Weekly
              option Monthly
              option Bi-Monthly
              option Quarterly
              option Bi-Quarterly
              option Yearly
    .column.is-half
      .field
        label.label Interest Rate
        .control
          input.input(v-model='apr', type='text', value='4%', placeholder='Text input')
      .field
        label.label Year-Over-Year Deposit Increase?
        .control
          input.input(type='text', value='$400', placeholder='Text input')
      .field
        label.label Compounded?
        .control
          .select
            select
              option Monthly
              option Bi-Monthly
              option Quarterly
              option Bi-Quarterly
              option Yearly
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true
            }
        },

        methods: {
            handleItemClick(item, contentType) {
                this.$emit('itemClicked', item, contentType);
            }
        }
    }
</script>
