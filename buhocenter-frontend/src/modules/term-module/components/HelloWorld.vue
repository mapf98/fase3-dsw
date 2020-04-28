<template>
  <div class="container">
    <div class="row text-center">
      <div class="form-group">
        <label for="exampleFormControlSelect1">Language</label>
        <select class="form-control" v-model="language" @change="changeLanguage">
          <option value="es">Spanish</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Term</th>
          <th scope="col">Language</th>
          <th scope="col">Traslate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(term, index) in getTerms" :key="index">
          <td>{{ term.term }}</td>
          <td>{{ language }}</td>
          <td>{{ term.translation.content }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import { termModule } from '../../../store/namespaces';
import TermModel from '../../../store/term-module/models/TermModel';
import termMethods from '../../../store/term-module/methods/term-methods';
import { ITermModuleState } from '../../../store/term-module/interfaces/Term';

@Component
export default class HelloWorld extends Vue {
  language: string = 'es';

  async mounted() {
    await this.actionTerm(this.language);
  }

  async changeLanguage(e:any) {
    const new_language = e.target.value;
    this.language = new_language;
    await this.actionTerm(new_language);
  }


  //@termModule.State('terms') terms: ITermModuleState['terms'] = [];
  @termModule.Action(termMethods.actions.GET_TERMS_LANGUAGE) actionTerm;
  @termModule.Getter(termMethods.getters.GET_TERMS) getTerms;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
