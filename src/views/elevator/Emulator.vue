<script>
export default {
  data: () => ({
    props: ['elevator'],
    elevatorLinks: [
      ['Описание задания', 'mdi-clipboard-text-outline', '/elevator', true],
      ['Настройки', 'mdi-cog-outline', '/elevator/settings', true],
      ['Эмуляция', 'mdi-elevator', '/elevator/emulator', true],
    ],
  }),
}
</script>

<template>

</template>