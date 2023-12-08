class NewsController < ApplicationController
  def index
    page = params[:page].to_i
    news_per_page = 10
    if page.nil? || page == 0
      @news_list = News.all.limit(news_per_page)
    else
      @news_list = News.all.offset(news_per_page*(page-1)).limit(news_per_page*page)
    end
  end

  def create
    news = News.new(news_params)
    if news.valid?
      news.save!
      flash[:info] = "Se ha agregado la noticia"
      redirect_to news_index_url
    else
      flash[:error] = "Error. No se ha guardado la noticia. Verifique los datos ingresados."
      redirect_to news_index_url
    end
  end

  def new
    @news = News.new
  end

  def show
  end

  private
  def news_params
    params.require(:news).permit(:headline, :byline, :author, :body, :picture_url)
  end
end
