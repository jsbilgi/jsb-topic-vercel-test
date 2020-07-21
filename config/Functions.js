import ReactGA from 'react-ga'

export const removeActiveTag = (tags, tag) => {
    var tagArr = tags.split(',')
    var index = tagArr.indexOf(tag)
    if(index > -1){
        tagArr.splice(index, 1);
    }
    return tagArr.join(',')
}

export const initGA = (GA_CODE) => {
    console.log('GA init')
    ReactGA.initialize(GA_CODE)
}
  
export const logPageView = () => {
    console.log(`Logging pageview for ${window.location.pathname}`)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}