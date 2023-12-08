class NewsController < ApplicationController
  def index
  end

  def create
    news = News.new(news.params)
    if news.valid?
      news.save!
      flash[:info] = "Se ha agregado la noticia"
      redirect_to news_index
    else
      flash[:error] = "Error. No se ha guardado la noticia. Verifique los datos ingresados."
    end
  end

  def new
    @news = News.new
  end
end
