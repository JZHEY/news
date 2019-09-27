import '../scss/index.scss'
import Header from '../components/header/header'
import Nav from '../components/nav/nav'
import { news_type } from "../util/data"
import { IndexModel } from '../models/index'
import NewsList from '../components/news_list/news_list'
import Loading from '../components/loading/loading'
import BottomLoading from '../components/bottom_loading/bottom_loading'
// import { scrollToBottom } from '../util/tools'

const header = new Header(),
      nav = new Nav(),
      newsList =  new NewsList(),
      loading = new Loading(),
      bottomLoading = new BottomLoading()

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
            $list.html(newsList.tpl(dataCache[field][pageNum],pageNum))
            
        }else{
            _insertRender()
            scrollToButton()
        }
        
    }

    const _insertRender = () => {
        console.log(`dddddddddddddddddddddddddddddddd ${pageNum} dddddddddddddddd`)
        if(pageNum < pageCount || !dataCache[field]){
            if(pageNum == 0){
                _loadingRender()
                indexModel.getNewsList(field,showPage).then(res => {
                    pageCount = res.length
                    dataCache[field] = res
                    $list.html(newsList.tpl(dataCache[field][pageNum],pageNum))
                    pageNum++
                    $('.loading').remove()
                })
            }else{
                $list.append(newsList.tpl(dataCache[field][pageNum],pageNum))
                if(pageNum < pageCount){
                    pageNum++
                }
                    
            }
            
        }
    }

    const _bottomRenter = (text,isloading) => {
        console.log('~~~~~~~~~~~~~~~~')
        $list.append(bottomLoading.tpl({
            text:text,
            isloading:isloading
        }))
    }

    function scrollToButton(){
        $(window).scroll(function(){
            console.log('aaa')
        　　var scrollTop = $(this).scrollTop();
        　　var scrollHeight = $(document).height();
        　　var windowHeight = $(this).height();
        　　if(scrollTop + windowHeight == scrollHeight){
                console.log(pageNum)
                if(pageNum === pageCount){
                    _bottomRenter("已加载全部",false)
                 }else{
                     _bottomRenter("正在加载中...",true)
                     setTimeout(() => {
                        $('.bottom-loading').remove()
                         _insertRender()
                         
                    }, 2000);
                 }
        　　}
        });
    }

    function selectNav () {
        const $this = $(this)
        pageNum = 0
        window.scrollTo(0,0)
        // console.log($this)
        field = $this.attr('data-type')
        $this.addClass("current").siblings().removeClass('current')
        _listRender()
    }


    init()
}

App(Zepto)