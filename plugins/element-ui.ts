import {
  ElButton,
  ElContainer,
  ElMain,
  ElAside,
  ElHeader,
  ElFooter,
  ElTable,
  ElTableColumn,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenuItemGroup,
  ElMenuItem,
  ElSubMenu,
  ElIcon,
  ElMenu,
  ElScrollbar
} from 'element-plus'

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp
    .use(ElButton)
    .use(ElContainer)
    .use(ElMain)
    .use(ElAside)
    .use(ElHeader)
    .use(ElFooter)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElDropdown)
    .use(ElDropdownMenu)
    .use(ElDropdownItem)
    .use(ElMenuItemGroup)
    .use(ElMenuItem)
    .use(ElSubMenu)
    .use(ElDropdownItem)
    .use(ElIcon)
    .use(ElMenu)
    .use(ElScrollbar)
})