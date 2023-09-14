<template>
  <div class="sonne">

  </div>
  <v-tabs
      class="mt-5 mb-n16"
      v-model="tab"
      align-tabs="center"
      style="color: #e3dede">
    <v-tab :value="0" color="white">Frage erstellen</v-tab>
    <v-tab :value="1" color="white">Frage löschen </v-tab>
    <v-tab :value="2" color="white">Frage bearbeiten </v-tab>
  </v-tabs>
<div class="d-flex justify-center align-center" style="height: 100vh">
  <v-card class="card1">
    <v-row justify="center">
      <v-col cols="11" class="d-flex justify-center">
        <div style="border-radius: 4px; padding: 8px; border: #e3dede solid 2px; width: 100% ">
          <h3 class="text-white text-center">Fragen</h3>
        </div>
      </v-col>
      <v-col cols="11" class="d-flex justify-center">
        <div style="border-radius: 4px; padding: 8px; border: #e3dede solid 2px; width: 100% ">
          <h3 class="text-white text-center">Nutzer</h3>
        </div>
      </v-col>
    </v-row>
  </v-card>
  <v-card class="card">
  <v-window v-model="tab">
    <v-window-item  class="text-white " value="0">
      <v-card-title class="text-center mb-5">
        Frage erstellen
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
.card1{
  margin-right: 30px;
  padding: 20px;
  height: 700px;
  width: 400px;
  background-color: #282727;
}
.sonne{
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: white;
  right: 50px;
  top: 20px;
  box-shadow: 0px 0px 30px 10px red inset, 0px 0px 30px 5px orange inset, 0px 0px 10px 5px red , 0px 0px 50px 15px red,0px 0px 200px 30px white;

}
</style>
