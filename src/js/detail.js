import '../scss/detail.scss'
import Header from '../components/header/index'
import NewsFrame from '../components/news_frame/frame';
import Collection from '../components/collection/collection'
import { getUrlQueryValue } from '../utils/tools'

const newsFrame = new NewsFrame(),
      header = new Header(),
      collection =  new Collection()

const App = ($) => {
    const $app = $('#app'),
          $frameWrapper = $app.children('.frame-wrapper'),
          newsUrl = getUrlQueryValue('news_url'),
          uniquekey = getUrlQueryValue('uniquekey')
    
    let collections = JSON.parse(localStorage.getItem('collections')) || {}
    let collected = Boolean(collections[uniquekey])

    const init = () => {
        render().then(bindEvent)
    }

    const render = () => {
        return new Promise((resolve,reject) => {
            _headerRender()
            _frameRender(newsUrl)
            _collectionRender(collected)
            resolve()
        })
    }

    const bindEvent = () => {
        $('.collection').on('click',newsCollected)
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            title:'详情',
            showLeftIcon:true,
            showRightIcon:false
        }))
    }

    const _frameRender = (newsUrl) => {
        $frameWrapper.append(newsFrame.tpl(newsUrl))
    }

    const _collectionRender = (collected) => {
        $app.append(collection.tpl(collected))
    }

    function newsCollected() {
        if(collections[uniquekey]){
            delete collections[uniquekey]
            collected = false
        }else{
            collections[uniquekey] = JSON.parse(localStorage.getItem('target'))
            collected = true
        }

        localStorage.setItem('collections',JSON.stringify(collections))

        collection.changeCollection(collected)
    }

    init()
}

App(Zepto)