import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {  
    // host:"0.0.0.0",             
    port: "8080",
    proxy: {                 //设置代理，必须填
        '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
            target: 'http://localhost:9090',     //代理的目标地址
            changeOrigin: true,              //是否设置同源，输入是的
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
}

})
