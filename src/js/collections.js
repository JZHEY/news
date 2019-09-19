import '../scss/collections.scss'
import Header from '../components/header/index'
import NoContentTip from '../components/no_content_tip/no_content_tip'
import NewsItem from '../components/news_item/news_item'
import { thumbShow } from '../utils/tools'

const header = new Header(),
      noContentTip = new NoContentTip(),
      newsItem = new NewsItem()
const App = ($) => {
    const $app = $('#app'),
          $list = $app.children('.list'),
          collections = JSON.parse(localStorage.getItem('collections'))

    const init = () => {
        render().then(bindEvent)
    }

    const render = () => {
        return new Promise ((resolve,reject) => {
            _headerRender()
            _no_content_tipRender()
            resolve()
        })
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            title:'我的收藏',
            showLeftIcon:true,
            showRightIcon:false
        }))
    }

    const _no_content_tipRender = () => {
        if(!collections || Object.keys(collections) === 0){
            $app.append(noContentTip.tpl('没有收藏内容'))
        }else{
            _newsItemRender()
        }
        
    }

    const _newsItemRender = () => {
        $list.html(newsItem.tpl(_arrangeDatas()))
        thumbShow($('.news-thumb'))
    }

    const bindEvent = () => {
        $list.on('click','.news-item',toDetailPage)
    }

    function toDetailPage() {
        const $this = $(this),
              url = $this.attr('data-url'),
              uniquekey = $this.attr('data-uniquekey')
        
        window.location.href = `detail.html?news_url=${url}&uniquekey=${uniquekey}`
    }

    function _arrangeDatas() {
        let _arr = []
        for(let key in collections){
            _arr.push(collections[key])
        }
        console.log(_arr)
        return _arr
    }
    

    init()
}

App(Zepto)