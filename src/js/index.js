import '../scss/index.scss'
import Header from '../components/header/index'
import Nav from '../components/nav/nav'
import { news_type } from '../utils/data'
import { IndexModel } from '../models/index'
import newItem from '../components/news_item/news_item';
import { thumbShow } from '../utils/tools'

let filed = 'top'
const header = new Header()
const nav = new Nav()
const new_item = new newItem

const indexModel = new IndexModel()

const App = ($) => {
    
    const $app = $('#app');
    const $list = $app.children('.list')

    const init = () => {
        render().then(bindEvent)
        indexModel.getNewsList(filed,10).then((res) => {
            // console.log(res)
            $list.html(new_item.tpl(res[0],0))
            thumbShow($('.news-thumb'))
        })
    }

    const  render = () => {
        return new Promise((resolve,reject) => {
            _headerRender(),
            _navRender(news_type)
            resolve()
        })
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            title:'新闻头条',
            showLeftIcon:false,
            showRightIcon:true
        }))
    }

    const _navRender = (newsType) => {
        const tpls = nav.tpl(newsType)
        $app.append(tpls.navStr)
        $('.nav .nav-wrapper').append(tpls.itemsStr)
    } 

    const bindEvent = () => {
        $('.nav .nav-wrapper').on('click','.item',navSelect)
    }

    function navSelect(){
        // console.log(this)
        const $this = $(this)
        console.log($this.attr('data-type'))
        filed = $this.attr('data-type')
        indexModel.getNewsList(filed,10).then((res) => {
            $list.html(new_item.tpl(res[0],0))
            thumbShow($('.news-thumb'))
        })
        //点击到的item添加class current 其他的item去除属性current
        $this.addClass('current').siblings('.item').removeClass('current')
    }

    init()
}

App(Zepto)