<template>
    <v-container class="blue-gradient rounded-b-xl">
        <div :style="{
            minHeight: mdAndUp ? '10vh' : '15vh',
            maxWidth: mdAndUp ? '30vw' : '100vw',
        }" class="d-flex justify-center align-center text-center " :class="smAndDown ? 'flex-row' : 'flex-column'">
            <v-col :cols="smAndDown ? 3 : 5" class="d-flex justify-center align-center">
                <v-img
                :width="300"
                aspect-ratio="16/9"
                cover
                src="../assets/foto-profissional.png"
                ></v-img>
            </v-col>
            <v-col cols="3" class="d-flex justify-center align-center">
                <v-text class="text-h5 font-weight-bold text-white">
                    Daniel
                </v-text>
            </v-col>
        </div>
    </v-container>
    <v-container>
        <v-list class="rounded-xl mb-4">
            <v-list-item 
            v-for="setting in settings.slice(0, 2)" 
            :key="setting.name"
            :to="setting.link"
            class="bg-grey-lighten-3 hover:bg-red-4 transition-colors duration-200 cursor-pointer ">
                <template #prepend>
                    <component
                    :is="setting.icon"
                    class="mr-3 opacity-70"
                    color="black"
                    />
                </template>
            <v-list-item-title>{{ setting.name }}</v-list-item-title>
                <template #append>
                    <ChevronRight
                    color="black"
                    class="opacity-70" 
                    />
                </template>
            </v-list-item>
        </v-list>
        <v-list class="rounded-xl mb-4">
            <v-list-item 
            v-for="setting in settings.slice(3, 5)" 
            :key="setting.name"
            :to="setting.link"
            class="bg-grey-lighten-3">
            <template #prepend>
                <component
                    :is="setting.icon"
                    class="mr-3 opacity-70"
                    color="black"
                />
            </template>
                <v-list-item-title>{{ setting.name }}</v-list-item-title>
                <template #append>
                    <ChevronRight
                    color="black"
                    class="opacity-70" 
                    />
                </template>
            </v-list-item>
        </v-list>
        <v-list>
            <v-list-item 
            v-for="setting in settings.slice(5)" 
            :key="setting.name"
            :to="setting.link" 
            class="bg-grey-lighten-3 text-red rounded-xl">
            <template #prepend>
            <component
                :is="setting.icon"
                class="mr-3 opacity-70"
                color="red"
            />
            </template>
                <v-list-item-title>{{ setting.name }}</v-list-item-title>
                <template #append>
                    <ChevronRight
                    color="red"
                    class="opacity-70" 
                    />
                </template>
            </v-list-item>
        </v-list>

    </v-container>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from "vuetify";
const router = useRouter()
import { Info, LockKeyhole, ChevronRight, Moon, Phone, LogOut } from 'lucide-vue-next'

const { smAndDown, mdAndUp } = useDisplay();


defineProps({
    settings: {
        type: Object,
        required: true,
    },
})
const settings = ref([
  {
    name: "Informações",
    icon: Info,
    link: 'infos',
  },
  {
    name: "Alterar senha",
    icon: LockKeyhole,
    link: 'change-password',
  },
  {
    name: "Tema escuro",
    icon: Moon,
  },
  {
    name: "Termos de Uso",
    icon: Info,
    link: 'terms-of-use',
  },
  {
    name: "Contato",
    icon: Phone,
    link: 'contact',
  },
  {
    name: "Sair",
    icon: LogOut,
    link: 'sign-in',
  },
]);
</script>
<style scoped>
.blue-gradient {
    background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
    background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>