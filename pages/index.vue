<script lang="ts" setup>
type Result = {
  title: string;
  lccn: string[];
  isbn: string[];
  author_name: string[];
  first_sentence: string[] | undefined;
  rating_average: number;
};
type Response = {
  docs: any[];
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: any;
  q: string;
  start: number;
};

const text = ref("");
const results = ref<Result[]>([]);
const resultsCount = ref(100);
const skip = ref(0);
const limit = ref(10);
const loading = ref(false);

const search = async () => {
  loading.value = true;
  results.value = [];
  const res = await $fetch<Response>(
    `https://openlibrary.org/search.json?q=${text.value
      .toString()
      .split(" ")
      .join("+")}&page=${skip.value + 1}&limit=${limit.value}&sort=rating`
  );
  console.log(res.docs);
  results.value = res.docs;
  resultsCount.value = res.numFound;
  loading.value = false;
};

const changePage = (page: number) => {
  skip.value = page - 1;
  search();
};
</script>

<template>
  <div class="w-full h-full flex flex-col bg-gray-50">
    <Card
      class="h-[80px] min-h-[80px] w-full flex items-center justify-between px-10"
    >
      <div class="text-3xl font-bold">
        <span class="text-primary">XWebDev</span>
      </div>
      <div class="w-[800px] flex justify-center">
        <Input
          v-model:model-value="text"
          class="max-w-[600px] rounded-xl h-[42px]"
          placeholder="Browse books..."
          @keyup.enter="search"
        />
        <Button
          @click="search"
          size="icon"
          class="w-[42px] h-[42px] rounded-xl ml-2"
        >
          <Icon name="Search" />
        </Button>
      </div>
      <div class="flex flex-col text-sm font-semibold text-gray-500">
        <span>Mary Grace M. Enriquez</span>
      </div>
    </Card>

    <div class="container w-full h-full p-6">
      <Card class="w-full flex flex-col">
        <div class="p-4">
          <span class="text-2xl font-bold text-gray-700">Results:</span>
        </div>
        <Separator></Separator>
        <div>
          <div v-if="results.length > 0" class="w-full py-2">
            <div v-for="(result, i) in results" :key="i">
              <div class="flex space-x-4 py-2 px-4">
                <div>
                  <img
                    v-if="result.lccn"
                    :src="`https://covers.openlibrary.org/b/lccn/${result.lccn[0]}-M.jpg`"
                    alt="Cover Image"
                    class="h-[250px] min-w-[250px] max-w-[250px] object-center object-cover rounded-xl"
                  />
                  <img
                    v-else-if="result.isbn"
                    :src="`https://covers.openlibrary.org/b/isbn/${result.isbn[0]}-M.jpg`"
                    alt="Cover Image"
                    class="h-[250px] min-w-[250px] max-w-[250px] object-center object-cover rounded-xl"
                  />
                  <img
                    v-else
                    :src="`https://placehold.co/250x250?text=${result.title}`"
                    alt="Cover Image"
                    class="h-[250px] min-w-[250px] max-w-[250px] object-center object-cover rounded-xl"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-xl font-semibold">{{ result.title }}</span>
                  <span class="text-sm italic text-gray-500 font-semibold">{{
                    result.author_name[0]
                  }}</span>
                  <p
                    class="text-sm text-gray-400 font-medium"
                    v-if="result.first_sentence"
                  >
                    " {{ result.first_sentence[0] }}"
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          </div>
          <div v-else class="w-full h-[600px] flex justify-center items-center">
            <span
              v-if="loading"
              class="flex items-center space-x-4 text-3xl text-gray-700 font-semibold animate-pulse"
              >Searching . . .
            </span>
            <div
              v-else
              class="flex flex-col text-gray-500 border-2 border-blue-400 p-4 rounded-xl"
            >
              <span class="font-bold">LIBRARY EDUCATION</span>
              <span class="text-sm font-medium mt-1"
                >This page is a compliance for the subject XWebDev in
                <span class="font-semibold"
                  >AEMILIANIUM COLLEGE INCORPORATED(ACI)</span
                >
                by:
              </span>
              <span class="text-center mt-3 font-semibold text-blue-400"
                >Mary Grace M. Enriquez</span
              >
            </div>
          </div>
          <div class="px-4 py-2 flex justify-end">
            <Pagination
              v-slot="{ page }"
              :total="resultsCount"
              :sibling-count="1"
              show-edges
              :default-page="skip + 1"
              :items-per-page="limit"
              @update:page="changePage($event)"
            >
              <PaginationList
                v-slot="{ items }"
                class="flex items-center gap-1"
              >
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                  <PaginationListItem
                    v-if="item.type === 'page'"
                    :key="index"
                    :value="item.value"
                    as-child
                  >
                    <Button
                      class="w-10 h-10 p-0"
                      :variant="item.value === page ? 'default' : 'outline'"
                    >
                      {{ item.value }}
                    </Button>
                  </PaginationListItem>
                  <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext />
                <PaginationLast />
              </PaginationList>
            </Pagination>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
