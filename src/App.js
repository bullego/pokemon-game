import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import './App.css';
import layoutBg from './assets/bg3.jpg';

const App = () => {
  return (
    <>
      <Header title desc/>

      <Layout id={1}
              title='First title'
              desc='Description for first layout'
              urlBg={layoutBg}/>
      <Layout id={2}
              title='Second title'
              desc='Description for second layout'
              colorBg='transparent'/>
      <Layout id={3}
              title='Third title'
              desc='Description for third layout'
              urlBg={layoutBg}/>

      <Footer/>
    </>
  )
}

export default App;
