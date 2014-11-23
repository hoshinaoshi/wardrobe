Wardrobe::Application.routes.draw do
  root to: 'top#index'
=begin
  get "/index2", to: "top#index2"
  get "/test", to: "top#test"
  get "/json_loader", to: "top#json_loader"
  get "/json_blender", to: "top#json_blender"
  get "/obj", to: "top#obj"
  get "/obj_mtl", to: "top#obj_mtl"
  get "/ply", to: "top#ply"
  get "/stl", to: "top#stl"
=end
end
