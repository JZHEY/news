import '../scss/index.scss'
import Header from '../components/header/index'
import Nav from '../components/nav/nav'
import PageLoading from '../components/page_loading/page_loading'
import BottomTip from '../components/bottom_tip/bottom_tip'
import { news_type } from '../utils/data'
import { IndexModel } from '../models/index'
import newItem from '../components/news_item/news_item';
import { thumbShow,scrollToBottom } from '../utils/tools'

const header = new Header()
const nav = new Nav()
const new_item = new newItem()
const pageloading = new PageLoading()
const bottomTip = new BottomTip()

const indexModel = new IndexModel()

let filed = 'top',
    pageNum = 0,
    pageCount = 0,
    showPage = 10,
    bottomLock = false

//页面数据缓存池
let dataCache = {}

const App = ($) => {
    
    const $app = $('#app');
    const $list = $app.children('.list')
    const newScrollToBottom = scrollToBottom.bind(null,scrollBottom)

    const init = () => {
        render(filed,pageNum,showPage).then(bindEvent)
        
    }

    //总渲染
    const  render = (filed,pageNum,showPage) => {
        return new Promise((resolve,reject) => {
            _headerRender(),
            _navRender(news_type)
            _listRender(filed,pageNum,showPage)
            resolve()
        })
    }

    //导航条渲染
    const _headerRender = () => {
        $app.append(header.tpl({
            title:'新闻头条',
            showLeftIcon:false,
            showRightIcon:true
        }))
    }

    //导航条菜单渲染
    const _navRender = (newsType) => {
        const tpls = nav.tpl(newsType)
        $app.append(tpls.navStr)
        $('.nav .nav-wrapper').append(tpls.itemsStr)
    } 

    //导航条菜单绑定点击事件
    const bindEvent = () => {
        $('.nav .nav-wrapper').on('click','.item',navSelect)
        $list.on('click','.news-item',toDetailPage)
    }
    
    //判断页面缓存池是否有对应的数据，没有就请求，有就用缓存池中的数据
    const _listRender = (filed,pageNum,showPage) =>{
        if(dataCache[filed]){
            console.log('存在存在')
            pageCount = dataCache[filed].length
            _insertRender()
        }else {
            //请求数据时，设置加载动画
            _loadingRender()
            indexModel.getNewsList(filed,showPage).then((res) => {
                pageCount = res.length
                dataCache[filed] = res
                _insertRender()
            })
        }
        
    }

    const _insertRender = () => {
        if(pageNum === 0){
            $list.html(new_item.tpl(dataCache[filed][pageNum],pageNum))
            $('.loading-icon').remove()
            $(window).on('scroll',newScrollToBottom)
            bottomLock = false
        }else{
            console.log(pageNum)
            if(pageNum < pageCount){
                _handleBottomList('remove')
                $list.append(new_item.tpl(dataCache[filed][pageNum],pageNum))
                $(window).on('scroll',newScrollToBottom)
                bottomLock = false
            }
        }
        
        
        setTimeout(() => {
            if(pageNum < pageCount){
               pageNum ++
               _insertRender()
            }
        }, 3000);

        thumbShow($('.news-thumb'))
    }

    
    //渲染loading
    const _loadingRender = () => {
        $list.html('')
        $app.append(pageloading.tpl())
    }

    const _handleBottomList = (how,loading,text) => {
        switch (how) {
            case 'append':
                $app.append(bottomTip.tpl(loading,text))
                break;
            case 'remove':
                $('.bottom-tip').remove()
                break;
            case 'removeAndAppend':
                $('.bottom-tip').remove()
                $app.append(bottomTip.tpl(loading,text))
                break;
        }
    }

    function scrollBottom(){
        if(pageNum < pageCount-1){
            if(!bottomLock){
                bottomLock = true
                _handleBottomList('append','loading','正在加载中')
            }
        }else{
            _handleBottomList('removeAndAppend','','已加载完成')
        }
    }

    function toDetailPage() {
        console.log(this)
        const $this = $(this),
            url = $this.attr('data-url'),
            uniquekey = $this.attr('data-uniquekey'),
            pageNum = $this.attr('data-pageNum'),
            index = $this.attr('data-index')
            
            // console.log(dataCache[filed][pageNum][index])
            localStorage.setItem('target',JSON.stringify(dataCache[filed][pageNum][index]))
            console.log(`detail.html?news_url=${url}&uniquekey=${uniquekey}`)
            window.location.href = `detail.html?news_url=${url}&uniquekey=${uniquekey}`
    }
    

    //根据选择的菜单请求ajax
    function navSelect(){
        // console.log(this)
        pageNum = 0
        _handleBottomList('remove','','')
        $(window).bind('scroll',newScrollToBottom)
        setTimeout(() => {
            window.scrollTo(0,0)
        }, 150);
        const $this = $(this)
        console.log($this.attr('data-type'))
        filed = $this.attr('data-type')
        _listRender(filed,pageNum,showPage)
        
        //点击到的item添加class current 其他的item去除属性current
        $this.addClass('current').siblings('.item').removeClass('current')
    }

    init()
}

App(Zepto)