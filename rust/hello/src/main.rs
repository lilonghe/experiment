#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/ping")]
fn ping() -> &'static str {
    "ok"
}

fn main() {
    rocket::ignite().
        mount("/", routes![index, ping]).
        launch();
}