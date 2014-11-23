class TopController < ApplicationController
  def index
    @pattern = ""
    case params[:pattern]
    when 'inner1'
      @pattern = '/assets/obj/inner1.ply'
    when 'inner2'
      @pattern = '/assets/obj/inner2.ply'
    when 'outer1'
      @pattern = '/assets/obj/outer1.ply'
    else
      @pattern = '/assets/obj/outer1.ply'
    end
  end
  def test
  end
  def json_loader
    render action: 'json_loader', layout: false
  end
  def json_blender
    render action: 'json_blender', layout: false
  end
  def obj
    render action: 'obj', layout: false
  end
  def obj_mtl
    render action: 'obj_mtl', layout: false
  end
  def ply
    render action: 'ply', layout: false
  end
  def stl
    render action: 'stl', layout: false
  end
end
