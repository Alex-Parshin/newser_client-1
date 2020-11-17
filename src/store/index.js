import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clients: [],
        engines: [],
        config: []
    },
    mutations: {
        clients(state, data) {
            let newClients = []
            data.forEach(client => {
                newClients.push({
                    name: client.name,
                    time: client.time,
                    upTime:"0д. 0ч. 0м. 0с.",
                    status: 0,
                    message: 'Подключился!',
                    logs: []
                })
            })
            state.clients = newClients
        },
        engines(state, data) {
            state.engines = data
        },
        config(state, data) {
            state.config = data
        },
        setConfig(state, data) {
            state.config = data
        },
        updateTime(state){
            setInterval(()=>{
                function upTime1(startDate){

                    let fullDate= startDate.split(" ");
                    let hmss=fullDate[0].split(".")
                    fullDate[0]=hmss[1]+"/"+hmss[0]+"/"+hmss[2];
                    var temp=fullDate.join(" ");
                    if(fullDate[1].split(":")[0]>12){
                        temp +=" PM"
                    }
                    else
                    {
                        temp +=" AM"
                    }
                        let timePeriod={
                            days:Math.floor((new Date() - new Date(temp))/(1000*86400)),
                            hours:Math.floor((new Date() - new Date(temp))/ (1000*60*60))%24,
                            minutes:Math.floor((new Date() - new Date(temp))/(1000*60))%60,
                            seconds:Math.floor((new Date() - new Date(temp))/ (1000)%60)
                        }
                            function returnDateString(period){
                                let time = `${period.days}д. ${period.hours}ч. ${period.minutes}м. ${period.seconds}с.`
                                console.log(time)
                                return time

                            }
                        return returnDateString(timePeriod)
                    }
                state.clients.forEach(client=>{
                    client.upTime=upTime1(client.time)
                })
            },2000)
        }
    },
    actions: {
        clientsAct({ commit }, data) {
            commit('clients', data)
        },
        async enginesAct({ commit }) {
            await axios.get(`http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/api/getEngines`)
                .then(data => {
                    commit('engines', data.data)
                })
        },
        async configAct({ commit }) {
            await axios.get(`http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/api/getConfig`)
                .then(data => {
                    commit('config', data.data)
                    console.log(data)
                })
        },
        async sendConfigAct({ commit }, data) {
            commit('setConfig', data)
            await axios.post(`http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/api/setConfig`, { config: data })
        }
    },
    modules: {},
    getters: {
        getClients: state => state.clients,
        getEngines: state => state.engines,
        getConfig: state => state.config
    }
})