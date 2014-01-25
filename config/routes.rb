Wardrobe::Application.routes.draw do
  get "top/index"
  root to: 'top#index'
end
