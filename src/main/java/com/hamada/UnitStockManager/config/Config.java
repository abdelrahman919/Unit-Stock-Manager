package com.hamada.UnitStockManager.config;

import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    public ModelMapper modelMapper() {
        return new ModelMapper();
    }


}
