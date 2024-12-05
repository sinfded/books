<template>
    <div class="w-full h-[80px] py-2 px-4 sticky top-0 z-40 bg-slate-50">
        <Card
            class="w-full flex justify-between items-center py-2 px-3 h-[64px]"
        >
            <div class="flex items-center">
                <Sheet class="flex lg:hidden">
                    <SheetTrigger
                        ><Button
                            variant="outline"
                            size="icon"
                            class="flex rounded-lg lg:hidden"
                            ><Icon name="Menu" class="text-gray-700" /></Button
                    ></SheetTrigger>
                    <SheetContent side="left" class="px-3 pt-10 w-[300px]">
                        <div class="py-2 flex flex-col space-y-1.5">
                            <NuxtLink
                                v-for="route in routes"
                                :to="route.link"
                                class="flex justify-start items-center pl-4 font-semibold text-sm h-10 rounded-lg hover:bg-slate-100 text-gray-700"
                                :class="[
                                    currRoute == route.link
                                        ? 'bg-slate-100'
                                        : '',
                                ]"
                            >
                                <Icon :name="route.icon" class="mr-4 w-5 h-5" />
                                {{ route.text }}
                            </NuxtLink>
                        </div>
                    </SheetContent>
                </Sheet>
                <Button
                    v-if="showBackBtn"
                    @click="useRouter().back"
                    variant="outline"
                    size="icon"
                    class="flex rounded-lg mr-2"
                    ><Icon name="ChevronLeft" class="text-gray-700"
                /></Button>
                <h1
                    class="text-xl capitalize font-bold text-gray-700 ml-3 lg:ml-0"
                >
                    {{ currRoute }}
                </h1>
            </div>

            <div class="flex items-center space-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button
                            variant="outline"
                            size="icon"
                            class="flex rounded-lg lg:hidden"
                        >
                            <Icon name="CalendarDays" class="text-gray-700" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        class="w-[280px] mr-4 mt-3 px-2 rounded-xl"
                    >
                        <DropdownMenuLabel>Events</DropdownMenuLabel>
                        <Tabs default-value="today" class="w-full">
                            <TabsList class="grid w-full grid-cols-2">
                                <TabsTrigger value="today"> Today </TabsTrigger>
                                <TabsTrigger value="upcoming">
                                    Upcoming
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="today"> </TabsContent>
                            <TabsContent value="upcoming"> </TabsContent>
                        </Tabs>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Avatar
                            class="h-9 w-9 flex items-center justify-center cursor-pointer"
                        >
                            <AvatarImage src="/icons/logo.png" alt="Avatar" />
                            <AvatarFallback
                                ><Icon name="UserRound"
                            /></AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56 mr-4 mt-3 rounded-xl">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem class="rounded-lg" as-child>
                                <NuxtLink to="/admin/dashboard">
                                    <Icon
                                        name="UserRound"
                                        class="mr-2 h-4 w-4"
                                    />
                                    <span>Profile</span>
                                </NuxtLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                @click="signOut"
                                class="rounded-lg"
                            >
                                <Icon name="LogOut" class="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const user = userStore.user;
const routes = userStore.routes;

const independentRoutes: string[] = [
    "marketing-news-editor",
    "admin-content-editor",
];

const currRoute = computed(() => useRoute().name?.toString().split("-")[1]);

const signOut = () => {
    userStore.signOut();
    useRouter().go(0);
};

const showBackBtn = computed(() => {
    const route = useRoute();

    if (
        independentRoutes.some((routeName: string) => routeName == route.name)
    ) {
        return true;
    } else {
        return false;
    }
});
</script>

<style></style>
