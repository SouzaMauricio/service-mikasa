import * as PropertyGateway from '../gateway/armin/services/properties'

// Create a new store instance.
export const state = () => ({
    favoriteList: [],
    acceptedPrivacyPolicy: false,
    acceptedPrivacyPolicyDate: null,
    propertyVisitHistory: []
  })

export const  mutations = {
    addInFavoriteList (state, property) {
      state.favoriteList.push(property)
    },
    removeFromFavoriteList (state, propertyCod) {
      state.favoriteList.splice(state.favoriteList.indexOf(state.favoriteList.find(property => property.cod === propertyCod)), 1)
    },
    privacyPolicyAccept (state) {
      state.acceptedPrivacyPolicy = true
      state.acceptedPrivacyPolicyDate = new Date()
    },
    setNewVisit (state, propertyCod) {
      const lastVisit = state.propertyVisitHistory.find(history => history.propertyCod === propertyCod)
      if (!lastVisit) {
        addNewVisit(propertyCod)
        state.propertyVisitHistory.push({ propertyCod, date: new Date()})
        return
      }
      if (isEnabledToAddNewVisit(lastVisit.date)) {
        addNewVisit(propertyCod)
        lastVisit.date = new Date()
      }
    }
  }

export const getters = {
    isFavorited: (state) => (propertyCod) => !!state.favoriteList.find(property => property.cod === propertyCod),
    getFavoritesList: (state) => state.favoriteList,
    favoriteListLength: (state) => state.favoriteList.length,
    isPrivacyPolicyAccepted: (state) => state.acceptedPrivacyPolicy,
    showUpdatePrivacyPolicy: (state) => {
      if (!state.acceptedPrivacyPolicyDate && state.acceptedPrivacyPolicy) return true
      if (!state.acceptedPrivacyPolicyDate) return false
      const lastUpdatePrivacyPolicyDate = '2022-11-15'
      return new Date(lastUpdatePrivacyPolicyDate) > new Date(state.acceptedPrivacyPolicyDate)
    } 
  }

const isEnabledToAddNewVisit = (lastDate) => {
  if (!lastDate) return false
  const minutesInterval = 5
  const diffTime = new Date() - new Date(lastDate)
  const diffMinutes = Math.ceil(diffTime / (1000 * 60))
  return diffMinutes > minutesInterval
}

const addNewVisit = async (propertyCod) => {
  await PropertyGateway.addNewVisit(propertyCod)
}
