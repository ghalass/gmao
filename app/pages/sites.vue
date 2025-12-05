<template>
  <div>
    <PageTitle>Sites</PageTitle>

    <!-- Bouton de test pour vérifier -->
    <UButton @click="testToast" icon="i-lucide-bell" color="info" class="mb-4">
      Test Toast
    </UButton>

    <div class="flex justify-center">
      <UForm
        :schema="schema"
        :state="formData"
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <UFormField label="name" name="name">
          <UInput v-model="formData.name" />
          <!-- Afficher l'erreur sous le champ -->
          <p v-if="errorCreation" class="text-red-500 text-sm mt-1">
            {{ errorCreation }}
          </p>
        </UFormField>

        <UButton type="submit" :loading="isSubmitting">
          {{ isSubmitting ? "Envoi en cours..." : "Submit" }}
        </UButton>
      </UForm>
    </div>

    <UButton
      @click="refresh()"
      icon="i-lucide-rocket"
      size="md"
      color="primary"
      variant="solid"
      class="mt-4"
      >refresh</UButton
    >

    <br />
    Total: {{ sites?.length }}

    <div v-if="pending">Chargement...</div>
    <div v-if="error">there is an error : {{ error.data.message }}</div>
    <UTable :data="sites" class="flex-1 mt-4" />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Sites",
});
import type { FormSubmitEvent } from "@nuxt/ui";
import { object, string } from "yup";
import type { InferType } from "yup";

const schema = object({
  name: string().min(2).required(),
});

type Schema = InferType<typeof schema>;

const formData = reactive({
  name: "",
});

const errorCreation = ref<string>("");
const isSubmitting = ref(false);

// useToast fonctionne correctement
const toast = useToast();

// Fonction de test
function testToast() {
  toast.add({
    title: "Test Toast",
    description: "Ceci est un test du système de notifications",
    icon: "i-heroicons-information-circle",
    color: "warning",
  });
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  errorCreation.value = "";
  isSubmitting.value = true;

  try {
    await schema.validate(formData, { abortEarly: false });

    const response = await $fetch("/api/sites", {
      method: "POST",
      body: { name: formData.name },
      retry: 0,
    });

    console.log("Réponse API:", response);

    // Toast de succès
    toast.add({
      title: "Succès",
      description: "Site créé avec succès",
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    formData.name = "";
    refresh();
  } catch (error: any) {
    const err = error?.data?.message;
    errorCreation.value = err;

    // Toast d'erreur
    toast.add({
      title: "Erreur",
      description: err || "Erreur lors de la création",
      icon: "i-heroicons-x-circle",
      color: "error",
    });

    console.log("Erreur:", err);
  } finally {
    isSubmitting.value = false;
  }
}

const { data: sites, pending, error, refresh } = useFetch("/api/sites", {});
</script>
