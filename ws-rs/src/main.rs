use std::fmt::format;
use std::io::Error;

use actix::{Actor, StreamHandler};
use actix_web::{
    get, post, route, web, App, HttpRequest, HttpResponse, HttpServer, Responder, Result,
};
use actix_web_actors::ws;

#[get("/")]
async fn index() -> impl Responder {
    println!("get | index");
    "Hello, World!"
}
struct MyWs;

impl Actor for MyWs {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
            Ok(ws::Message::Text(text)) => ctx.text(format!("{:?}", text)),
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            _ => (),
        }
    }
}

async fn ws_start(
    req: HttpRequest,
    stream: web::Payload,
) -> std::result::Result<HttpResponse, actix_web::Error> {
    let resp = ws::start(MyWs {}, &req, stream);
    // println!("Client message: {:?}", resp);
    resp
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(index)
            .route("/ws", web::get().to(ws_start))
    })
    .bind(("localhost", 3000))?
    .run()
    .await
}
