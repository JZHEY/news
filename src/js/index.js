import '../scss/index.scss'
import Header from '../components/header/index'
import Nav from '../components/nav/nav'
import {news_type} from '../utils/data'

const header = new Header()
const nav = new Nav()

const App = ($) => {
    const $app = $('#app');

    const init = () => {
        render()
    }

    const  render = () => {
        _headerRender(),
        _navRender(news_type)
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

    init()
}

App(Zepto)