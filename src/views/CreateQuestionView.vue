<template>
  <v-tabs
      class="mt-5 mb-n16"
      v-model="tab"
      align-tabs="center"
      style="color: #e3dede">
    <v-tab :value="0" color="black">Frage erstellen</v-tab>
    <v-tab :value="1" color="black">Frage löschen -></v-tab>
    <v-tab :value="2" color="black">Frage bearbeiten </v-tab>
  </v-tabs>
<div class="d-flex justify-center align-center" style="height: 100vh">
  <v-card class="card">
  <v-window v-model="tab">
    <v-window-item  class="text-white " value="0">
      <v-card-title class="text-center mb-5">
        Frage Erstellen
      </v-card-title>
      <div style="overflow-y: scroll; padding-bottom: 200px; height: 100%">
        <v-row class="d-flex justify-center">
          <v-col class="d-flex justify-center" cols="10">
            <v-text-field v-model="topic" density="comfortable" class="textInput" variant="outlined" label="Thema">

            </v-text-field>
          </v-col>
          <v-col class="mt-n8" cols="10">
            <!---  <div class="justify-center d-flex">
               <v-card style="width: 60vw" class="mt-10">
                 <quill-editor v-model:content="$store.state.quest" theme="snow"></quill-editor>
               </v-card>
             </div>-->
            <v-textarea variant="outlined" label="Frage" v-model="$store.state.quest">

            </v-textarea>
          </v-col>
          <v-col class="mt-n8" cols="10">
            <!---    <div  class="justify-center d-flex">
                  <v-card style="width: 60vw" class="mt-10">
                    <quill-editor v-model:content="$store.state.answer" theme="snow"></quill-editor>
                  </v-card>
                </div> -->
            <v-textarea variant="outlined" label="Antwort" v-model="$store.state.answer">

            </v-textarea>
          </v-col>
          <v-col class="d-flex justify-center" cols="12">
            <v-btn @click="createQuestion">
              Speichern
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-window-item>
    <v-window-item  class="text-white " value="1">
      <v-card-title class="text-center mb-5">
        Frage löschen
      </v-card-title>
      <div style="overflow-y: scroll; height: 600px; padding-bottom: 80px ">
        <v-row style="width: 100%" class="mx-0" justify="center">
          <v-col v-for="quest in $store.state.quests" :key="quest.id" class="d-flex justify-center" cols="11">
            <div style="border: #e3dede solid 2px; border-radius: 4px; width: 100%;padding: 10px">
              <v-row justify="space-between">
                <v-col>
                   <span>
               {{quest.id}}: {{quest.topic}}
             </span>
                </v-col>
                <v-col class="d-flex justify-end">
              <Icon style="font-size: 40px; cursor: pointer" @click="deleteQuestion(quest.id)" icon="fluent:delete-20-filled" />
                </v-col>
              </v-row>
              <br>
              <p>Frage:</p>
              <p>
                {{quest.question}}
              </p>
              <br>
              <p>Antwort:</p>
              <p>
                {{quest.answer}}
              </p>

            </div>
          </v-col>



        </v-row>
      </div>


    </v-window-item>
    <v-window-item  class="text-white " value="2">
      <v-card-title class="text-center mb-5">
        Frage bearbeiten
      </v-card-title>
      <div style="overflow-y: scroll; height: 600px; padding-bottom: 80px ">
        <v-row style="width: 100%" class="mx-0" justify="center">
          <v-col v-for="quest in $store.state.quests" :key="quest.id" class="d-flex justify-center" cols="11">
            <div style="border: #e3dede solid 2px; border-radius: 4px; width: 100%;padding: 10px">
              <v-row justify="space-between">
                <v-col>
                  <p>ID: &nbsp;{{quest.id}}</p>
                   <v-text-field variant="outlined" v-model="quest.topic" >

             </v-text-field>
                </v-col>
                <v-col class="d-flex justify-end">
                  <Icon style="font-size: 40px; cursor: pointer" @click="updateQuestion(quest.id,quest.topic,quest.question,quest.answer)" icon="flat-color-icons:ok" />
                </v-col>
              </v-row>
              <br>
              <p class="mt-n7">Frage:</p>
              <v-textarea v-model="quest.question" variant="outlined">
                {{quest.question}}
              </v-textarea>
              <br>
              <p class="mt-n7">Antwort:</p>
              <v-textarea v-model="quest.answer" variant="outlined">
                {{quest.answer}}
              </v-textarea>

            </div>
          </v-col>



        </v-row>
      </div>


    </v-window-item>

  </v-window>
  </v-card>

</div>
</template>

<script>
import { Icon } from '@iconify/vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import axios from "axios";
export default {
  name: "CreateQuestionView",
  components: {Icon,},
  data(){
    return{
    topic:'',
      tab:2,

    }
  },
  mounted() {
    this.getAllQuestion()
  },
  methods:{
    async updateQuestion(id,uTopic,uQuestion,uAnswer){
      let response = await axios.put('/update/question/'+ id ,{
        topic: uTopic,
        question: uQuestion,
        answer: uAnswer,
      })
      console.log(response)
    },
    convertDeltaToHtml(delta) {
      const converter = new QuillDeltaToHtmlConverter(delta.ops);
      return converter.convert();
    },

    async deleteQuestion(id){
      let response = await axios.delete('/delete/question/'+ id)
      console.log(response)
    },
    async getAllQuestion(){
      let response = await axios.get('/all/question')
      this.$store.state.quests = response.data
      console.log(response)
    },
   async createQuestion(){
     let response = await axios.post('/create/question', {
       topic: this.topic,
       question: this.$store.state.quest,
       answer: this.$store.state.answer, // Weitere Attribute
     })
     this.$store.state.quests.push({topic: this.topic, question: this.$store.state.quest, answer: this.$store.state.answer,})
     console.log(response)
     this.topic =''
     this.$store.state.quest = ''
     this.$store.state.answer = ''
   }
  }
}
</script>

<style scoped>
.card{
  padding: 20px;
  height: 700px;
  width: 730px;
  background-color: #282727;
}

</style>
