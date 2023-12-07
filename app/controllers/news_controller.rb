class NewsController < ApplicationController
  def index
  end

  def create
  end

  def new
    @news = News.new
  end
end
