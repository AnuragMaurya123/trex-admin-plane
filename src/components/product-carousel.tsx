/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Package, TrendingUp } from "lucide-react"
import { ProductCarouselProps } from "@/lib/types"
import { useEffect, useState } from "react"

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [api, setApi] = useState<any>()
  
  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return
    
    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)
    
    return () => clearInterval(interval)
  }, [api])

  return (
    <div className="w-full ">
      <h2 className="text-3xl md:text-4xl font-bold text-left mb-10 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text leading-relaxed text-transparent">
        Top Selling Products
      </h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-purple-400/30 transition-all duration-300 rounded-xl overflow-hidden group border border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6 space-y-4">
                    
                    {/* Product Image */}
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={
                          product.image || "/placeholder.svg?width=400&height=400&query=abstract+product+placeholder"
                        }
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center truncate">
                      {product.name}
                    </h3>
                    
                    {/* Product Stats */}
                    <div className="space-y-3 pt-2 border-t border-purple-200 dark:border-purple-700">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <Package className="w-4 h-4 mr-2 text-purple-600" />
                          Total Sold:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {product.totalSell.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                          Total Revenue:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${product.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <DollarSign className="w-4 h-4 mr-2 text-purple-600" />
                          Unit Price:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${product.unitPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
       
      </Carousel>
    </div>
  )
}