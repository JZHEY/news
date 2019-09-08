import '../scss/collections.scss'
import Header from '../components/header/index'


const App = ($) => {
    const header = new Header()

    const $app = $('#app')

    const init = () => {
        render()
    }

    const render = () => {
        _headerRender()
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            title:'我的收藏',
            showLeftIcon:true,
            showRightIcon:false
        }))
    }

    init()
}

App(Zepto)