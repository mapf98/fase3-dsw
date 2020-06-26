<template>
    <div :class="'searchbar'">
        <input :class="'input '" placeholder="Search" />
        <div class="icon">
            <i class="fas fa-search"></i>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class SearchBar extends Vue {
    @Prop() size!: string;

    get getSize(): string {
        return this.size;
    }
}
</script>

<style scoped lang="scss">
.searchbar {
    position: relative;
    margin-left: 10px;
}

.searchbar .icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 100%;
    background: #907f46;
    border-radius: 0px 3px 3px 0;
    color: #fff;
    cursor: pointer;
    &:hover {
        background: #987746;
    }
}

.searchbar .icon i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
}

.input {
    border: 1px solid #907f46;
    padding: 10px;
    height: 35px;
    outline: none;
    border-radius: 3px;
    margin-right: 0;
    box-shadow: 0 0 5px #907f46;
    width: 250px;
    transition: all 0.2s ease;

    &:focus {
        width: 300px;
    }
}
</style>
