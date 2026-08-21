出口 异步 功能 得到(请求) {
  返回 proxyRequest(请求, '/v1/models');
}

异步 功能 proxyRequest(请求, targetPath) {
  Const{ 搜索 }=新的 URL(请求.URL);
  ConsttargetUrl='https://integrate.api.nvidia.com'+targetPath+搜索;
  
  Const页眉={};
  为 (Const [钥匙, 价值]……的请求.页眉.条目()) {
    ConstLK=钥匙.toLowerCase();
    如果 (!['主机', '连接'].包括(LK)) {
      页眉[钥匙]=价值;
    }
  }
  页眉['主机']='integrate.api.nvidia.com';
  
  尝试 {
    Const响应=等候 取来(targetUrl, { 方法: 'GET', 页眉 });
    ConstresponseHeaders={};
    响应.页眉.foreach((价值, 钥匙)=>{
      如果 (!['传输编码', '连接'].包括(钥匙.toLowerCase())) {
        responseHeaders[钥匙]=价值;
      }
    });
    返回 新的 响应(响应.身体, { 状态: 响应.状态, 页眉: responseHeaders });
  } 赶上 (误差) {
    返回 新的 响应(JSON.使字符串化({误差: 误差.消息}), { 状态: 502, 页眉: {'内容类型': '应用程序/约翰逊} });
  }
      }
