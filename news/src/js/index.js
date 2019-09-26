import '../scss/index.scss'
import Header from '../components/header/header'
import Nav from '../components/nav/nav'
import { news_type } from "../util/data"
import { IndexModel } from '../models/index'
import NewsList from '../components/news_list/news_list'
import Loading from '../components/loading/loading'
import { scrollToBottom } from '../util/tools'

const header = new Header(),
      nav = new Nav(),
      newsList =  new NewsList(),
      loading = new Loading()

const indexModel = new IndexModel()

let field = 'top',
    pageNum = 0,
    showPage = 10,
    pageCount = 0,
    dataCache = {}

const App = ($) => {
    const $app = $('#app'),
          $list = $app.children('.list')

    const init = () => {
        render().then(bindEvent)
    }

    const render = () => {
        return new Promise((resolve,reject) => {
            _headerRender()
            _navRender()
            _listRender()
            resolve()
        })
    }

    const bindEvent = () => {
        $('.scroll-wrapper').on('click','.item',selectNav)
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            iconLeft:'none',
            title:"新闻头条",
            iconRight:'block'
        }))
        
    }

    const _navRender = () => {
        let tpls = nav.tpl(news_type)
        $app.append(tpls.navStr)
        $('.nav .scroll-wrapper').append(tpls.itemStr)
    }

    const _loadingRender = () =>{
        $list.html("")
        $app.append(loading.tpl())
    }

    const _listRender = () => {
        console.log($list)
        if(dataCache[field]){
            pageCount = dataCache.length
            $list.html(newsList.tpl(dataCache[field][pageNum]),pageNum)
        }else{
            _loadingRender()
            indexModel.getNewsList(field,showPage).then(res => {
                pageCount = res.length
                dataCache[field] = res
                $list.html(newsList.tpl(dataCache[field][pageNum]),pageNum)
                $('.loading').remove()
            })
        }
        
    }

    function selectNav () {
        const $this = $(this)
        // console.log($this)
        field = $this.attr('data-type')
        $this.addClass("current").siblings().removeClass('current')
        _listRender()
    }


    init()
}

App(Zepto)