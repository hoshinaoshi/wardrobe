Wardrobe::Application.routes.draw do
  get "top/index"
  get "top/index2"
  root to: 'top#index'
end
