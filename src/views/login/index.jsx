import React from 'react'
import './index.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Particles from 'react-tsparticles';
import axios from 'axios';

export default function Login(props) {
  const onFinish = (values)=>{
    axios.get(`http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then((res) => {
      if (res.data.length === 0) {
        message.error("用户密码不匹配!!!")
      } else {
        localStorage.setItem("token", JSON.stringify(res.data[0]));
        props.history.push('/home')
      }
    })
  }
  return (
    <div style={{ height: "100%" ,zIndex:0}}>
      <Particles height={document.documentElement.clientHeight}
        params={
          {
            "autoPlay": true, "background": { "color": { "value": "rgb(35,39,65)" }, "image": "", "position": "50% 50%", "repeat": "no-repeat", "size": "cover", "opacity": 1 }, "backgroundMask": { "composite": "destination-out", "cover": { "color": { "value": "#fff" }, "opacity": 1 }, "enable": false }, "defaultThemes": {}, "delay": 0, "fullScreen": { "enable": true, "zIndex": 50 }, "detectRetina": true, "duration": 0, "fpsLimit": 120, "interactivity": { "detectsOn": "window", "events": { "onClick": { "enable": false, "mode": "push" }, "onDiv": { "selectors": [], "enable": false, "mode": [], "type": "circle" }, "onHover": { "enable": false, "mode": "repulse", "parallax": { "enable": false, "force": 2, "smooth": 10 } }, "resize": { "delay": 0.5, "enable": true } }, "modes": { "attract": { "distance": 200, "duration": 0.4, "easing": "ease-out-quad", "factor": 1, "maxSpeed": 50, "speed": 1 }, "bounce": { "distance": 200 }, "bubble": { "distance": 400, "duration": 2, "mix": false, "opacity": 0.8, "size": 40, "divs": { "distance": 200, "duration": 0.4, "mix": false, "selectors": [] } }, "connect": { "distance": 80, "links": { "opacity": 0.5 }, "radius": 60 }, "grab": { "distance": 400, "links": { "blink": false, "consent": false, "opacity": 1 } }, "push": { "default": true, "groups": [], "quantity": 4 }, "remove": { "quantity": 2 }, "repulse": { "distance": 200, "duration": 0.4, "factor": 100, "speed": 1, "maxSpeed": 50, "easing": "ease-out-quad", "divs": { "distance": 200, "duration": 0.4, "factor": 100, "speed": 1, "maxSpeed": 50, "easing": "ease-out-quad", "selectors": [] } }, "slow": { "factor": 3, "radius": 200 }, "trail": { "delay": 1, "pauseOnStop": false, "quantity": 1 }, "light": { "area": { "gradient": { "start": { "value": "#ffffff" }, "stop": { "value": "#000000" } }, "radius": 1000 }, "shadow": { "color": { "value": "#000000" }, "length": 2000 } } } }, "manualParticles": [], "particles": { "bounce": { "horizontal": { "random": { "enable": false, "minimumValue": 0.1 }, "value": 1 }, "vertical": { "random": { "enable": false, "minimumValue": 0.1 }, "value": 1 } }, "collisions": { "absorb": { "speed": 2 }, "bounce": { "horizontal": { "random": { "enable": false, "minimumValue": 0.1 }, "value": 1 }, "vertical": { "random": { "enable": false, "minimumValue": 0.1 }, "value": 1 } }, "enable": false, "mode": "bounce", "overlap": { "enable": true, "retries": 0 } }, "color": { "value": "#ffffff", "animation": { "h": { "count": 0, "enable": false, "offset": 0, "speed": 1, "decay": 0, "sync": true }, "s": { "count": 0, "enable": false, "offset": 0, "speed": 1, "decay": 0, "sync": true }, "l": { "count": 0, "enable": false, "offset": 0, "speed": 1, "decay": 0, "sync": true } } }, "groups": {}, "move": { "angle": { "offset": 0, "value": 90 }, "attract": { "distance": 200, "enable": false, "rotate": { "x": 600, "y": 1200 } }, "center": { "x": 50, "y": 50, "mode": "percent", "radius": 0 }, "decay": 0, "distance": {}, "direction": "none", "drift": 0, "enable": true, "gravity": { "acceleration": 9.81, "enable": false, "inverse": false, "maxSpeed": 50 }, "path": { "clamp": true, "delay": { "random": { "enable": false, "minimumValue": 0 }, "value": 0 }, "enable": false, "options": {} }, "outModes": { "default": "destroy", "bottom": "destroy", "left": "destroy", "right": "destroy", "top": "destroy" }, "random": false, "size": false, "speed": 5, "spin": { "acceleration": 0, "enable": false }, "straight": false, "trail": { "enable": false, "length": 10, "fill": {} }, "vibrate": false, "warp": false }, "number": { "density": { "enable": true, "width": 1920, "height": 1080 }, "limit": 0, "value": 0 }, "opacity": { "random": { "enable": false, "minimumValue": 0.1 }, "value": 1, "animation": { "count": 0, "enable": false, "speed": 3, "decay": 0, "sync": false, "destroy": "none", "startValue": "random", "minimumValue": 0.1 } }, "reduceDuplicates": false, "shadow": { "blur": 0, "color": { "value": "#000" }, "enable": false, "offset": { "x": 0, "y": 0 } }, "shape": { "options": {}, "type": "circle" }, "size": { "random": { "enable": false, "minimumValue": 1 }, "value": { "min": 0.1, "max": 20 }, "animation": { "count": 0, "enable": true, "speed": 5, "decay": 0, "sync": true, "destroy": "max", "startValue": "min", "minimumValue": 0.1 } }, "stroke": { "width": 0 }, "zIndex": { "random": { "enable": false, "minimumValue": 0 }, "value": 0, "opacityRate": 1, "sizeRate": 1, "velocityRate": 1 }, "life": { "count": 0, "delay": { "random": { "enable": false, "minimumValue": 0 }, "value": 0, "sync": false }, "duration": { "random": { "enable": false, "minimumValue": 0.0001 }, "value": 0, "sync": false } }, "rotate": { "random": { "enable": false, "minimumValue": 0 }, "value": 0, "animation": { "enable": false, "speed": 0, "decay": 0, "sync": false }, "direction": "clockwise", "path": false }, "destroy": { "bounds": {}, "mode": "none", "split": { "count": 1, "factor": { "random": { "enable": false, "minimumValue": 0 }, "value": 3 }, "rate": { "random": { "enable": false, "minimumValue": 0 }, "value": { "min": 4, "max": 9 } }, "sizeOffset": true } }, "roll": { "darken": { "enable": false, "value": 0 }, "enable": false, "enlighten": { "enable": false, "value": 0 }, "mode": "vertical", "speed": 25 }, "tilt": { "random": { "enable": false, "minimumValue": 0 }, "value": 0, "animation": { "enable": false, "speed": 0, "decay": 0, "sync": false }, "direction": "clockwise", "enable": false }, "twinkle": { "lines": { "enable": false, "frequency": 0.05, "opacity": 1 }, "particles": { "enable": false, "frequency": 0.05, "opacity": 1 } }, "wobble": { "distance": 5, "enable": false, "speed": { "angle": 50, "move": 10 } }, "orbit": { "animation": { "count": 0, "enable": false, "speed": 1, "decay": 0, "sync": false }, "enable": false, "opacity": 1, "rotation": { "random": { "enable": false, "minimumValue": 0 }, "value": 45 }, "width": 1 }, "links": { "blink": false, "color": { "value": "#ffffff" }, "consent": false, "distance": 150, "enable": false, "frequency": 1, "opacity": 0.4, "shadow": { "blur": 5, "color": { "value": "#000" }, "enable": false }, "triangles": { "enable": false, "frequency": 1 }, "width": 1, "warp": false }, "repulse": { "random": { "enable": false, "minimumValue": 0 }, "value": 0, "enabled": false, "distance": 1, "duration": 1, "factor": 1, "speed": 1 } }, "pauseOnBlur": true, "pauseOnOutsideViewport": true, "responsive": [], "smooth": false, "style": {}, "themes": [], "zLayers": 100, "emitters": { "autoPlay": true, "fill": true, "life": { "wait": false }, "rate": { "quantity": 2, "delay": 0.1 }, "shape": "square", "startCount": 0, "size": { "mode": "percent", "height": 0, "width": 100 }, "direction": "top", "particles": {}, "position": { "x": 50, "y": 100 } }
          }}
      />
      <div className='formContent'>
        <div className="title">
          全球新闻发布系统
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
