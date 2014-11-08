Wardrobe::Application.routes.draw do
  get "/", to: "top#index"
  get "/test", to: "top#test"
end
